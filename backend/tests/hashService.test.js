const fs = require("fs");
const path = require("path");
const os = require("os");
const { generateFileHash } = require("../src/services/hashService");

describe("hashService — generateFileHash", () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "blockcert-hash-"));
  });

  afterEach(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("TC-H01: returns deterministic SHA-256 hex for same file content", () => {
    const content = "BlockCert test payload";
    const filePath = path.join(tempDir, "doc.txt");
    fs.writeFileSync(filePath, content, "utf8");

    const first = generateFileHash(filePath);
    const second = generateFileHash(filePath);

    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
  });

  test("TC-H02: different file content produces different hash", () => {
    const a = path.join(tempDir, "a.bin");
    const b = path.join(tempDir, "b.bin");
    fs.writeFileSync(a, "alpha");
    fs.writeFileSync(b, "beta");

    expect(generateFileHash(a)).not.toBe(generateFileHash(b));
  });

  test("TC-H03: known vector — empty file SHA-256", () => {
    const empty = path.join(tempDir, "empty.pdf");
    fs.writeFileSync(empty, "");

    const hash = generateFileHash(empty);
    expect(hash).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
  });

  test("TC-H04: known vector — string 'hello'", () => {
    const f = path.join(tempDir, "hello.txt");
    fs.writeFileSync(f, "hello", "utf8");

    expect(generateFileHash(f)).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
  });
});
