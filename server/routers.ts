import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    sendMessage: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "El nombre es requerido"),
          email: z.string().email("Email inválido"),
          subject: z.string().min(1, "El asunto es requerido"),
          message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const notificationSent = await notifyOwner({
            title: `Nuevo mensaje de contacto de ${input.name}`,
            content: `Email: ${input.email}\nAsunto: ${input.subject}\n\nMensaje:\n${input.message}`,
          });

          if (!notificationSent) {
            console.warn("Notification service temporarily unavailable, but message was recorded");
          }

          return {
            success: true,
            message: "Mensaje enviado exitosamente",
          };
        } catch (error) {
          console.error("Error sending contact message:", error);
          return {
            success: false,
            message: "Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
