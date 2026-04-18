import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
  it("TC-F01: renders brand and tagline", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("BlockCert")).toBeInTheDocument();
    expect(
      screen.getByText(/Blockchain-based certificate verification platform/i)
    ).toBeInTheDocument();
  });

  it("TC-F02: renders main navigation links with correct hrefs", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footer = container.querySelector("footer");
    expect(footer).toBeTruthy();
    expect(footer.querySelector('a[href="/"]')).toBeTruthy();
    expect(footer.querySelector('a[href="/verify"]')).toBeTruthy();
    expect(footer.querySelector('a[href="/student/login"]')).toBeTruthy();
    expect(footer.querySelector('a[href="/institute/login"]')).toBeTruthy();
  });

  it("TC-F03: renders copyright line with current year", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const year = String(new Date().getFullYear());
    const footer = container.querySelector("footer");
    const copyrightRow = footer?.querySelector(".border-t.border-slate-100");
    expect(copyrightRow?.textContent).toMatch(new RegExp(`©\\s*${year}\\s*BlockCert`, "i"));
  });
});
