import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

type AnonymousUser = null;

function createAnonymousContext(): { ctx: TrpcContext; } {
  const ctx: TrpcContext = {
    user: null as unknown as AnonymousUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("contact.sendMessage", () => {
  it("sends a contact message successfully with valid input", async () => {
    const { ctx } = createAnonymousContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.sendMessage({
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message with enough characters",
    });

    expect(result).toEqual({
      success: true,
      message: "Mensaje enviado exitosamente",
    });
  });

  it("rejects message with invalid email", async () => {
    const { ctx } = createAnonymousContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.sendMessage({
        name: "Test User",
        email: "invalid-email",
        subject: "Test Subject",
        message: "This is a test message with enough characters",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Email inválido");
    }
  });

  it("rejects message with empty name", async () => {
    const { ctx } = createAnonymousContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.sendMessage({
        name: "",
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message with enough characters",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("El nombre es requerido");
    }
  });

  it("rejects message with short message", async () => {
    const { ctx } = createAnonymousContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.sendMessage({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "Short",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("al menos 10 caracteres");
    }
  });

  it("rejects message with empty subject", async () => {
    const { ctx } = createAnonymousContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.sendMessage({
        name: "Test User",
        email: "test@example.com",
        subject: "",
        message: "This is a test message with enough characters",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("El asunto es requerido");
    }
  });
});
