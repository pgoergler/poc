import{b as i,j as e}from"./react-flow-B4jYlsUg.js";import{u as B,b as R,d as W}from"./index-CjS9-CpA.js";import{u as G}from"./useTranslation-Del4SLmt.js";import"./ts-morph-SaAo0aQ4.js";const g="arko:auth:redirect";function H(){const{t:a}=G(),{authEnabled:u,isAuthenticated:m,isLoading:s,signInWithGitHub:y,signInWithEmail:N,signUpWithEmail:L}=B(),b=R(),[S]=W(),c=S.get("redirect")??"/workflows",[E,h]=i.useState(!1),[t,d]=i.useState("signin"),[l,z]=i.useState(""),[n,P]=i.useState(""),[f,v]=i.useState(""),[w,o]=i.useState(""),[j,p]=i.useState(""),[k,C]=i.useState(!1);i.useEffect(()=>{if(!s&&m){const r=sessionStorage.getItem(g);sessionStorage.removeItem(g),b(r??c,{replace:!0})}},[s,m,b,c]);const A=async()=>{if(u)try{sessionStorage.setItem(g,c),await y()}catch(r){console.error("Sign in failed:",r),sessionStorage.removeItem(g)}},I=async r=>{if(r.preventDefault(),o(""),p(""),!l.trim()){o(a("pages.login.errorEmail"));return}if(!n){o(a("pages.login.errorPassword"));return}if(t==="signup"){if(n.length<12){o(a("pages.login.errorPasswordLength"));return}if(!/\d/.test(n)){o(a("pages.login.errorPasswordDigit"));return}if(!/[^a-zA-Z0-9]/.test(n)){o(a("pages.login.errorPasswordSpecial"));return}if(n!==f){o(a("pages.login.errorPasswordMatch"));return}}C(!0);try{const x=t==="signin"?await N(l,n):await L(l,n);if(!x.success){o(x.error??a("pages.login.errorGeneric"));return}if(x.needsEmailConfirmation){p(a("pages.login.successConfirmation"));return}}catch{o(a("pages.login.errorUnexpected"))}finally{C(!1)}},M=()=>{d(r=>r==="signin"?"signup":"signin"),o(""),p(""),v("")};return e.jsxs("div",{className:"login-page",children:[e.jsxs("div",{className:"login-waves",children:[e.jsx("svg",{className:"login-wave",viewBox:"0 0 1440 320",preserveAspectRatio:"none",children:e.jsx("path",{fill:"rgba(139, 92, 246, 0.25)",d:"M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})}),e.jsx("svg",{className:"login-wave",viewBox:"0 0 1440 320",preserveAspectRatio:"none",children:e.jsx("path",{fill:"rgba(99, 102, 241, 0.2)",d:"M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})}),e.jsx("svg",{className:"login-wave",viewBox:"0 0 1440 320",preserveAspectRatio:"none",children:e.jsx("path",{fill:"rgba(59, 130, 246, 0.15)",d:"M0,288L48,277.3C96,267,192,245,288,234.7C384,224,480,224,576,234.7C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})})]}),e.jsxs("div",{className:"login-card",children:[e.jsx("div",{className:"login-logo",children:"Arko"}),e.jsx("p",{className:"login-tagline",children:a("pages.login.tagline")}),e.jsxs("button",{className:"login-btn",onClick:A,disabled:!u||s,children:[e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:"login-btn-icon",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})}),a(s?"pages.login.loadingOAuth":"pages.login.signInGitHub")]}),E?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-separator",children:[e.jsx("span",{className:"login-separator-line"}),e.jsx("span",{className:"login-separator-text",children:a("common.or")}),e.jsx("span",{className:"login-separator-line"})]}),e.jsxs("form",{className:"login-email-form",onSubmit:I,children:[w&&e.jsx("div",{className:"login-message login-message-error",children:w}),j&&e.jsx("div",{className:"login-message login-message-success",children:j}),e.jsx("input",{className:"login-input",type:"email",placeholder:a("pages.login.emailPlaceholder"),value:l,onChange:r=>z(r.target.value),autoComplete:"email"}),e.jsx("input",{className:"login-input",type:"password",placeholder:a("pages.login.passwordPlaceholder"),value:n,onChange:r=>P(r.target.value),autoComplete:t==="signin"?"current-password":"new-password"}),t==="signup"&&e.jsx("input",{className:"login-input",type:"password",placeholder:a("pages.login.confirmPasswordPlaceholder"),value:f,onChange:r=>v(r.target.value),autoComplete:"new-password"}),e.jsx("button",{className:"login-btn login-btn-email",type:"submit",disabled:k,children:a(k?"pages.login.loadingOAuth":t==="signin"?"pages.login.signIn":"pages.login.create")}),e.jsx("button",{className:"login-mode-toggle",type:"button",onClick:M,children:a(t==="signin"?"pages.login.noAccount":"pages.login.alreadyAccount")})]})]}):e.jsxs("div",{className:"login-email-links",children:[e.jsx("button",{className:"login-email-toggle",onClick:()=>{d("signin"),h(!0)},type:"button",children:a("pages.login.signInEmail")}),e.jsx("button",{className:"login-email-toggle",onClick:()=>{d("signup"),h(!0)},type:"button",children:a("pages.login.createAccount")})]}),e.jsxs("div",{className:"login-features",children:[e.jsxs("div",{className:"login-feature",children:[e.jsx("div",{className:"login-feature-icon",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"size-4",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]})}),e.jsx("div",{className:"login-feature-text",children:"EventStorming"})]}),e.jsxs("div",{className:"login-feature",children:[e.jsx("div",{className:"login-feature-icon",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"size-4",children:e.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}),e.jsx("div",{className:"login-feature-text",children:"Code Gen"})]}),e.jsxs("div",{className:"login-feature",children:[e.jsx("div",{className:"login-feature-icon",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"size-4",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("polyline",{points:"1 20 1 14 7 14"}),e.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]})}),e.jsx("div",{className:"login-feature-text",children:"Simulate"})]})]})]}),e.jsx("style",{children:`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--color-bg-primary);
          background-image:
            radial-gradient(at 20% 10%, rgba(139, 92, 246, 0.35) 0px, transparent 50%),
            radial-gradient(at 80% 10%, rgba(99, 102, 241, 0.25) 0px, transparent 50%),
            radial-gradient(at 10% 60%, rgba(59, 130, 246, 0.3) 0px, transparent 50%),
            radial-gradient(at 90% 50%, rgba(236, 72, 153, 0.15) 0px, transparent 50%),
            radial-gradient(at 30% 90%, rgba(6, 182, 212, 0.25) 0px, transparent 50%),
            radial-gradient(at 70% 80%, rgba(139, 92, 246, 0.2) 0px, transparent 50%);
        }

        .login-waves {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 35%;
          pointer-events: none;
          z-index: 1;
        }

        .login-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          animation: login-wave 12s linear infinite;
        }

        .login-wave:nth-child(1) {
          opacity: 0.6;
          animation-duration: 12s;
        }

        .login-wave:nth-child(2) {
          opacity: 0.4;
          animation-delay: -4s;
          animation-duration: 16s;
        }

        .login-wave:nth-child(3) {
          opacity: 0.25;
          animation-delay: -2s;
          animation-duration: 20s;
        }

        @keyframes login-wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .login-card {
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          padding: 56px 48px;
          text-align: center;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }

        .login-logo {
          font-size: 52px;
          font-weight: 700;
          letter-spacing: -2px;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.75) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-tagline {
          color: var(--color-text-muted);
          font-size: 14px;
          margin-bottom: 40px;
        }

        .login-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.7) 0%,
            rgba(99, 102, 241, 0.7) 50%,
            rgba(59, 130, 246, 0.7) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.5);
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow:
            0 15px 40px -10px rgba(139, 92, 246, 0.6),
            0 0 20px rgba(139, 92, 246, 0.3);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-btn-icon {
          width: 20px;
          height: 20px;
        }

        .login-features {
          display: flex;
          gap: 24px;
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .login-feature {
          text-align: center;
          flex: 1;
        }

        .login-feature-icon {
          width: 36px;
          height: 36px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          color: var(--color-accent);
        }

        .login-feature-text {
          color: var(--color-text-muted);
          font-size: 11px;
          font-weight: 500;
        }

        .login-email-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 16px;
        }

        .login-email-toggle {
          display: block;
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 13px;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
        }

        .login-email-toggle:hover {
          color: var(--color-text-primary);
        }

        .login-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }

        .login-separator-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
        }

        .login-separator-text {
          color: var(--color-text-muted);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-email-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .login-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: var(--color-text-primary);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }

        .login-input::placeholder {
          color: var(--color-text-muted);
        }

        .login-input:focus {
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(255, 255, 255, 0.1);
        }

        .login-btn-email {
          width: 100%;
          justify-content: center;
        }

        .login-message {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
          text-align: left;
        }

        .login-message-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #f87171;
        }

        .login-message-success {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
        }

        .login-mode-toggle {
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 13px;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
          padding: 0;
        }

        .login-mode-toggle:hover {
          color: var(--color-text-primary);
        }

        /* Light mode adjustments */
        .light .login-page {
          background-color: var(--color-bg-primary);
          background-image:
            radial-gradient(at 20% 10%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 10%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
            radial-gradient(at 10% 60%, rgba(59, 130, 246, 0.2) 0px, transparent 50%),
            radial-gradient(at 90% 50%, rgba(236, 72, 153, 0.1) 0px, transparent 50%),
            radial-gradient(at 30% 90%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
            radial-gradient(at 70% 80%, rgba(139, 92, 246, 0.12) 0px, transparent 50%);
        }

        .light .login-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        }

        .light .login-logo {
          background: linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .light .login-features {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .light .login-separator-line {
          background: rgba(0, 0, 0, 0.12);
        }

        .light .login-input {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: var(--color-text-primary);
        }

        .light .login-input:focus {
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(0, 0, 0, 0.02);
        }

        .light .login-message-error {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #dc2626;
        }

        .light .login-message-success {
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #16a34a;
        }
      `})]})}export{H as default};
