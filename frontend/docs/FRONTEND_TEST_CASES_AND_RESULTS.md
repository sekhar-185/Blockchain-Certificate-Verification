# BlockCert Frontend — Test Cases and Results

## Coverage scope

| Category | Status |
| -------- | ------ |
| **Automated (Vitest)** | `Footer` component — brand, links, copyright (`src/components/common/Footer.test.jsx`) |
| **Full app / E2E** | Not in this suite — use Playwright/Cypress separately if required |

**Note:** Vitest, Testing Library, and `jsdom` are **devDependencies**. They do **not** block `npm run dev` or `npm run build`; they run only when you execute `npm test`.

## How to run

From the `frontend` folder:

```bash
npm install
npm test
```

Watch mode (optional):

```bash
npm run test:watch
```

## Test case table (automated)

| Test ID | Description | Expected result |
| ------- | ----------- | ---------------- |
| **TC-F01** | Footer shows brand and tagline | Text `BlockCert` and tagline visible |
| **TC-F02** | Footer links point to `/`, `/verify`, `/student/login`, `/institute/login` | Matching `<a href>` inside `<footer>` |
| **TC-F03** | Copyright includes current calendar year | Row text matches `© <year> BlockCert` |

## Sample pass output (documentation-ready)

After `npm test`, Vitest should report **3 passed** tests for `Footer.test.jsx`.

---

*Extend `src/**/*.test.jsx` as you add more components. Align IDs with your project test plan.*
