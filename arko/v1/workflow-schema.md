# Arko Workflow JSON Schema — v8

This document describes the `.arko.json` format used by Arko to persist workflow definitions.
It is intended for LLMs and tools that need to generate or parse valid workflow files.

**Format version**: 8 (field `version` at document root)
**Content-Type**: `application/json`

---

## Core Concept: Dual-Graph Architecture

An Arko workflow separates **logical** from **visual** concerns:

- **Definitions** (`definitions[]`) — logical nodes (the workflow semantics). A definition can have multiple visual instances.
- **Transitions** (`transitions[]`) — logical edges between definitions.
- **Instances** (`instances[]`) — visual nodes on the canvas, each referencing one definition.
- **Edge Mappings** (`edgeMappings[]`) — visual edges referencing a logical transition.
- **Outcomes** (`outcomes[]`) — visual child nodes of a Policy, representing branching options.
- **Outcome Edge Mappings** (`outcomeEdgeMappings[]`) — links outcomes to transitions.

---

## Document Root

```json
{
  "version": 8,
  "metadata": { ... },
  "workflow": { ... }
}
```

| Field      | Type             | Required | Description              |
|------------|------------------|----------|--------------------------|
| `version`  | number           | yes      | Must be `8`              |
| `metadata` | WorkflowMetadata | yes      | Workflow metadata        |
| `workflow` | SerializedWorkflow | yes    | Workflow body            |

---

## WorkflowMetadata

```json
{
  "name": "Order Processing",
  "slugName": "order-processing",
  "targetPlugin": "serverless-aws-ts",
  "pluginConfig": {
    "paths": {
      "events": "src/events",
      "usecases": "src/usecases",
      "functions": "src/functions",
      "infrastructure": "src/infrastructure"
    }
  },
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T12:30:00.000Z",
  "description": "Handles order creation and fulfillment"
}
```

| Field          | Type   | Required | Description                                          |
|----------------|--------|----------|------------------------------------------------------|
| `name`         | string | yes      | Human-readable workflow name                         |
| `slugName`     | string | no       | kebab-case derived from name                         |
| `targetPlugin` | enum   | no       | `"serverless-aws-ts"` or `"serverless-aws-php"`      |
| `pluginConfig` | object | no       | Code generation output paths                         |
| `createdAt`    | string | yes      | ISO 8601 datetime                                    |
| `updatedAt`    | string | yes      | ISO 8601 datetime                                    |
| `description`  | string | no       | Free-text description                                |

---

## SerializedWorkflow

```json
{
  "definitions": [...],
  "transitions": [...],
  "instances": [...],
  "edgeMappings": [...],
  "outcomes": [...],
  "outcomeEdgeMappings": [...]
}
```

| Field                | Type    | Required | Description                         |
|----------------------|---------|----------|-------------------------------------|
| `definitions`        | array   | yes      | Logical node definitions            |
| `transitions`        | array   | yes      | Logical edges between definitions   |
| `instances`          | array   | yes      | Visual nodes on canvas              |
| `edgeMappings`       | array   | yes      | Visual edges → transitions          |
| `outcomes`           | array   | no       | Visual outcome nodes (Policy only)  |
| `outcomeEdgeMappings`| array   | no       | Outcome nodes → transitions         |

---

## ID Formats

All IDs use prefixed ULIDs (26 Crockford base32 characters):

| Prefix      | Type               | Example                        |
|-------------|-------------------|--------------------------------|
| `def_`      | NodeDefinition     | `def_01JFXYZ1234567890ABCDEF` |
| `trans_`    | Transition         | `trans_01JFXYZ1234567890ABCDE`|
| `inst_`     | Visual instance    | `inst_01JFXYZ1234567890ABCDE` |
| `outcome_`  | Outcome node       | `outcome_01JFXYZ1234567890AB` |

---

## SerializedNodeDefinition

```json
{
  "id": "def_01JFXYZ1234567890ABCDEF",
  "label": "Order Created",
  "kind": "event",
  "category": "business",
  "executionMode": "automatic",
  "config": { ... },
  "awsExtension": { "timeout": 30, "memory": 256 }
}
```

| Field           | Type   | Required | Description                                   |
|-----------------|--------|----------|-----------------------------------------------|
| `id`            | string | yes      | `def_<ULID>`                                  |
| `label`         | string | yes      | Display name                                  |
| `kind`          | enum   | yes      | See Node Kinds below                          |
| `category`      | enum   | yes      | `"business"` or `"technical"`                 |
| `executionMode` | enum   | yes      | `"automatic"` or `"manual"`                   |
| `config`        | object | no       | Kind-specific configuration                   |
| `awsExtension`  | object | no       | `{ timeout?: number, memory?: number }`       |

### Node Kinds

| Kind             | Category  | Default executionMode | IR Compiled | Notes                          |
|------------------|-----------|----------------------|-------------|--------------------------------|
| `event`          | business  | automatic            | yes         | Toggleable via tag             |
| `command`        | business  | dynamic              | yes         | Auto if ≤1 output, manual if 2+|
| `policy`         | business  | dynamic              | yes         | Auto if ≤1 outcome, manual if 2+|
| `trigger`        | business  | manual               | yes         | HTTP or scheduled              |
| `externalSystem` | technical | manual               | **no**      | Visual only, ignored in IR     |
| `externalEvent`  | technical | manual               | **no**      | Visual only, ignored in IR     |
| `hotspot`        | business  | manual               | **no**      | Annotation only, no handles    |
| `note`           | business  | manual               | **no**      | Annotation only, no handles    |
| `actor`          | technical | manual               | **no**      | Annotation only, no handles    |

---

## Node Configs

### CommandConfig

```json
{
  "slugName": "create-order",
  "requestSchema": [
    { "name": "orderId", "type": "string", "required": true },
    { "name": "amount", "type": "number", "required": true }
  ],
  "outputPath": "src/usecases"
}
```

| Field           | Type   | Required | Description                        |
|-----------------|--------|----------|------------------------------------|
| `slugName`      | string | no       | kebab-case identifier              |
| `requestSchema` | Schema | no       | Array of SchemaProperty            |
| `outputPath`    | string | no       | Code generation output path        |

### EventConfig

```json
{
  "type": "order.created",
  "schema": [
    { "name": "orderId", "type": "string", "required": true }
  ],
  "outputPath": "src/events"
}
```

| Field        | Type   | Required | Description                     |
|--------------|--------|----------|---------------------------------|
| `type`       | string | no       | dot.case event type identifier  |
| `schema`     | Schema | no       | Event payload schema            |
| `outputPath` | string | no       | Code generation output path     |

### PolicyConfig

```json
{
  "type": "order-routing",
  "outcomeConditions": [
    {
      "outcomeId": "outcome_01ABC...",
      "outcomeLabel": "Standard Shipping",
      "conditionGroups": [
        { "eventDefIds": ["def_01ABC...", "def_02DEF..."] }
      ]
    },
    {
      "outcomeId": "outcome_02DEF...",
      "outcomeLabel": "Express Shipping",
      "isElse": true
    }
  ]
}
```

| Field               | Type   | Required | Description                  |
|---------------------|--------|----------|------------------------------|
| `type`              | string | no       | Policy identifier            |
| `outcomeConditions` | array  | no       | Outcome condition definitions|

**outcomeCondition fields**:

| Field             | Type    | Required | Description                                                                   |
|-------------------|---------|----------|-------------------------------------------------------------------------------|
| `outcomeId`       | string  | no       | Reference to `outcome_<ULID>`                                                 |
| `outcomeLabel`    | string  | yes      | Display label for the outcome                                                 |
| `condition`       | string  | no       | Legacy condition string (deprecated)                                          |
| `conditionGroups` | array   | no       | DNF formula: groups are OR'd, events within a group are AND'd. Auto-fires when satisfied. |
| `isElse`          | boolean | no       | Fires when NO other condition is satisfied. Memory is preserved. Max 1 per policy. |

**Outcome firing modes**:
- `conditionGroups` present → **auto-fires** when DNF condition is satisfied
- No `conditionGroups`, no `isElse` → **manual** — user must click to fire
- `isElse: true` → **auto-fires** when no other condition is satisfied (memory preserved)

### TriggerConfig

```json
{
  "slugName": "create-order",
  "triggerType": "http",
  "httpMethod": "POST",
  "path": "/orders",
  "schema": [...],
  "outputPath": "src/functions"
}
```

| Field        | Type   | Required | Description                              |
|--------------|--------|----------|------------------------------------------|
| `slugName`   | string | no       | kebab-case identifier                    |
| `triggerType`| enum   | no       | `"http"` or `"schedule"`                 |
| `httpMethod` | enum   | no       | `"GET"`, `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"` |
| `path`       | string | no       | HTTP path (e.g. `/orders`)               |
| `schedule`   | string | no       | Cron expression for scheduled trigger    |
| `schema`     | Schema | no       | Input schema                             |
| `outputPath` | string | no       | Code generation output path              |

### ExternalSystemConfig / ExternalEventConfig

```json
{ "slugName": "stripe" }
```

| Field        | Type   | Required | Description         |
|--------------|--------|----------|---------------------|
| `slugName`   | string | no       | kebab-case name     |

ExternalEventConfig also supports:

| Field        | Type   | Required | Description                          |
|--------------|--------|----------|--------------------------------------|
| `systemType` | enum   | no       | `"scheduler"` or `"external"`        |
| `schedule`   | string | no       | Cron expression if scheduler type    |

### HotSpotConfig / NoteConfig / ActorConfig

```json
{ "description": "Clarify payment flow here" }
```

| Field         | Type   | Required | Description      |
|---------------|--------|----------|------------------|
| `description` | string | no       | Free text note   |

---

## SchemaProperty

Used inside `requestSchema`, `schema` fields:

```json
{
  "name": "address",
  "type": "object",
  "required": true,
  "properties": [
    { "name": "street", "type": "string" },
    { "name": "city", "type": "string" }
  ]
}
```

| Field        | Type   | Required | Description                                    |
|--------------|--------|----------|------------------------------------------------|
| `name`       | string | yes      | Property name                                  |
| `type`       | enum   | yes      | `"string"`, `"number"`, `"boolean"`, `"object"`, `"array"`, `"date"` |
| `required`   | boolean| no       | Whether property is required                   |
| `properties` | array  | no       | Nested schema (for `type: "object"`)           |
| `items`      | object | no       | Item schema (for `type: "array"`)              |

---

## SerializedTransition

```json
{
  "id": "trans_01JFXYZ1234567890ABCDE",
  "sourceDefId": "def_01JFXYZ1234567890ABCDEF",
  "targetDefId": "def_02GHIJK1234567890ABCDE"
}
```

| Field         | Type   | Required | Description                   |
|---------------|--------|----------|-------------------------------|
| `id`          | string | yes      | `trans_<ULID>`                |
| `sourceDefId` | string | yes      | Source `def_<ULID>`           |
| `targetDefId` | string | yes      | Target `def_<ULID>`           |

---

## SerializedInstance

```json
{
  "id": "inst_01JFXYZ1234567890ABCDE",
  "definitionId": "def_01JFXYZ1234567890ABCDEF",
  "position": { "x": 250, "y": 150 }
}
```

| Field          | Type   | Required | Description                  |
|----------------|--------|----------|------------------------------|
| `id`           | string | yes      | `inst_<ULID>`                |
| `definitionId` | string | yes      | Referenced `def_<ULID>`      |
| `position.x`   | number | yes      | Canvas X coordinate          |
| `position.y`   | number | yes      | Canvas Y coordinate          |

---

## SerializedOutcome

```json
{
  "id": "outcome_01JFXYZ1234567890ABCD",
  "label": "Approved",
  "parentPolicyInstanceId": "inst_01JFXYZ1234567890ABCDE",
  "parentPolicyDefId": "def_01JFXYZ1234567890ABCDEF",
  "position": { "x": 400, "y": 300 }
}
```

| Field                    | Type   | Required | Description                     |
|--------------------------|--------|----------|---------------------------------|
| `id`                     | string | yes      | `outcome_<ULID>`                |
| `label`                  | string | yes      | Outcome display label           |
| `parentPolicyInstanceId` | string | yes      | Parent Policy `inst_<ULID>`     |
| `parentPolicyDefId`      | string | yes      | Parent Policy `def_<ULID>`      |
| `position.x`             | number | yes      | Canvas X coordinate             |
| `position.y`             | number | yes      | Canvas Y coordinate             |

---

## SerializedEdgeMapping

```json
{
  "edgeId": "edge-inst_ABC-inst_DEF",
  "transitionId": "trans_01JFXYZ1234567890ABCDE",
  "source": "inst_01JFXYZ1234567890ABCDE",
  "target": "inst_02GHIJK1234567890ABCDE",
  "sourceHandle": "source-right",
  "targetHandle": "target-left",
  "label": "success",
  "labelOffset": 0.5
}
```

| Field          | Type   | Required | Description                                  |
|----------------|--------|----------|----------------------------------------------|
| `edgeId`       | string | yes      | Visual edge identifier                       |
| `transitionId` | string | yes      | Referenced `trans_<ULID>`                    |
| `source`       | string | yes      | Source `inst_<ULID>` or `outcome_<ULID>`     |
| `target`       | string | yes      | Target `inst_<ULID>`                         |
| `sourceHandle` | string | no       | Handle ID: `"source-top/bottom/left/right"`  |
| `targetHandle` | string | no       | Handle ID: `"target-top/bottom/left/right"`  |
| `label`        | string | no       | Edge label (used for Command edges)          |
| `labelOffset`  | number | no       | Label position along edge (0.0–1.0)          |

---

## SerializedOutcomeEdgeMapping

```json
{
  "outcomeId": "outcome_01JFXYZ1234567890ABCD",
  "transitionId": "trans_01JFXYZ1234567890ABCDE"
}
```

| Field          | Type   | Required | Description                     |
|----------------|--------|----------|---------------------------------|
| `outcomeId`    | string | yes      | `outcome_<ULID>`                |
| `transitionId` | string | yes      | Referenced `trans_<ULID>`       |

---

## Valid Connection Rules

| Source           | Can Connect To                                          |
|------------------|---------------------------------------------------------|
| `event`          | `policy`, `command`, `externalEvent`, `trigger`, `externalSystem` |
| `command`        | `event` only                                            |
| `policy`         | `command`, `externalEvent`, `trigger`, `externalSystem` (via Outcome) |
| `trigger`        | `event` only                                            |
| `externalSystem` | `event` only                                            |
| `externalEvent`  | `command`, `trigger`                                    |
| `hotspot`        | nothing (no handles)                                    |
| `note`           | nothing (no handles)                                    |
| `actor`          | nothing (no handles)                                    |

Connections are validated in **both directions** (source canConnectTo AND target canReceiveFrom).

---

## Important Constraints

1. **Policy requires minimum 2 outcomes** — always include at least 2 entries in `outcomes[]` and `outcomeConditions`
2. **`isElse` outcome: max 1 per policy**
3. `externalSystem`, `externalEvent`, `hotspot`, `note`, `actor` are **ignored during IR compilation** (no code generated)
4. **One definition, multiple instances allowed** — same logic node can appear at multiple canvas positions
5. **Cascade deletion**: deleting the last instance of a definition removes the definition and its transitions
6. **Outcome nodes belong to a Policy** — `parentPolicyInstanceId` and `parentPolicyDefId` must reference an existing Policy

---

## Minimal Example: Trigger → Event → Policy → 2 Commands → 2 Events

```json
{
  "version": 8,
  "metadata": {
    "name": "Simple Order Flow",
    "slugName": "simple-order-flow",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  "workflow": {
    "definitions": [
      { "id": "def_01AAA", "label": "New Order",       "kind": "trigger",  "category": "business",  "executionMode": "manual",    "config": { "slugName": "new-order", "triggerType": "http", "httpMethod": "POST", "path": "/orders" } },
      { "id": "def_01BBB", "label": "Order Received",  "kind": "event",    "category": "business",  "executionMode": "automatic"  },
      { "id": "def_01CCC", "label": "Route Order",     "kind": "policy",   "category": "business",  "executionMode": "manual",    "config": { "outcomeConditions": [{ "outcomeLabel": "Standard" }, { "outcomeLabel": "Express" }] } },
      { "id": "def_01DDD", "label": "Ship Standard",   "kind": "command",  "category": "business",  "executionMode": "automatic", "config": { "slugName": "ship-standard" } },
      { "id": "def_01EEE", "label": "Ship Express",    "kind": "command",  "category": "business",  "executionMode": "automatic", "config": { "slugName": "ship-express" } },
      { "id": "def_01FFF", "label": "Order Shipped",   "kind": "event",    "category": "business",  "executionMode": "automatic"  },
      { "id": "def_01GGG", "label": "Order Expedited", "kind": "event",    "category": "business",  "executionMode": "automatic"  }
    ],
    "transitions": [
      { "id": "trans_01AAA", "sourceDefId": "def_01AAA", "targetDefId": "def_01BBB" },
      { "id": "trans_01BBB", "sourceDefId": "def_01BBB", "targetDefId": "def_01CCC" },
      { "id": "trans_01CCC", "sourceDefId": "def_01CCC", "targetDefId": "def_01DDD" },
      { "id": "trans_01DDD", "sourceDefId": "def_01CCC", "targetDefId": "def_01EEE" },
      { "id": "trans_01EEE", "sourceDefId": "def_01DDD", "targetDefId": "def_01FFF" },
      { "id": "trans_01FFF", "sourceDefId": "def_01EEE", "targetDefId": "def_01GGG" }
    ],
    "instances": [
      { "id": "inst_01AAA", "definitionId": "def_01AAA", "position": { "x": 0,   "y": 0   } },
      { "id": "inst_01BBB", "definitionId": "def_01BBB", "position": { "x": 200, "y": 0   } },
      { "id": "inst_01CCC", "definitionId": "def_01CCC", "position": { "x": 400, "y": 0   } },
      { "id": "inst_01DDD", "definitionId": "def_01DDD", "position": { "x": 600, "y": -80 } },
      { "id": "inst_01EEE", "definitionId": "def_01EEE", "position": { "x": 600, "y": 80  } },
      { "id": "inst_01FFF", "definitionId": "def_01FFF", "position": { "x": 800, "y": -80 } },
      { "id": "inst_01GGG", "definitionId": "def_01GGG", "position": { "x": 800, "y": 80  } }
    ],
    "edgeMappings": [
      { "edgeId": "e1", "transitionId": "trans_01AAA", "source": "inst_01AAA", "target": "inst_01BBB" },
      { "edgeId": "e2", "transitionId": "trans_01BBB", "source": "inst_01BBB", "target": "inst_01CCC" },
      { "edgeId": "e5", "transitionId": "trans_01EEE", "source": "inst_01DDD", "target": "inst_01FFF" },
      { "edgeId": "e6", "transitionId": "trans_01FFF", "source": "inst_01EEE", "target": "inst_01GGG" }
    ],
    "outcomes": [
      { "id": "outcome_01AAA", "label": "Standard", "parentPolicyInstanceId": "inst_01CCC", "parentPolicyDefId": "def_01CCC", "position": { "x": 400, "y": -60 } },
      { "id": "outcome_01BBB", "label": "Express",  "parentPolicyInstanceId": "inst_01CCC", "parentPolicyDefId": "def_01CCC", "position": { "x": 400, "y": 60  } }
    ],
    "outcomeEdgeMappings": [
      { "outcomeId": "outcome_01AAA", "transitionId": "trans_01CCC" },
      { "outcomeId": "outcome_01BBB", "transitionId": "trans_01DDD" }
    ]
  }
}
```

---

## Example: Policy with Conditional Outcomes (DNF)

```json
{
  "id": "def_POLICY",
  "label": "Fraud Check",
  "kind": "policy",
  "category": "business",
  "executionMode": "manual",
  "config": {
    "type": "fraud-routing",
    "outcomeConditions": [
      {
        "outcomeId": "outcome_APPROVED",
        "outcomeLabel": "Approved",
        "conditionGroups": [
          { "eventDefIds": ["def_SCORE_OK", "def_KYC_DONE"] }
        ]
      },
      {
        "outcomeId": "outcome_REVIEW",
        "outcomeLabel": "Manual Review",
        "conditionGroups": [
          { "eventDefIds": ["def_SCORE_OK"] },
          { "eventDefIds": ["def_SCORE_FAIL", "def_KYC_DONE"] }
        ]
      },
      {
        "outcomeId": "outcome_REJECTED",
        "outcomeLabel": "Rejected",
        "isElse": true
      }
    ]
  }
}
```

**Reading the DNF conditions**:
- `Approved` fires when: (`SCORE_OK` AND `KYC_DONE`)
- `Manual Review` fires when: (`SCORE_OK`) OR (`SCORE_FAIL` AND `KYC_DONE`)
- `Rejected` fires when: none of the above conditions are met (ELSE — memory preserved)
