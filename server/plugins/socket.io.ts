import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
    // // Comments
    // socket.on("submitComment", async (value) => {
    //   const data = await $fetch('/api/admin/video/comment', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //           data: value.data,
    //           video: value.video,
    //           userId: value.userId
    //         })
    //       }).then(async (res) => {

    //         await $fetch('/api/admin/video/comment/' + value.video).then((res) => {
    //           io.emit("videoComments", res);
    //         })
    //     })
    // });
    // socket.on("deleteComment", async (value) => {
    //  await $fetch('/api/admin/video/comment/' + value.id, {
    //         method: 'DELETE',
    //       }).then(async (res) => {
    //         await $fetch('/api/admin/video/comment/' + value.video).then((res) => {
    //           io.emit("videoComments", res);
    //         })
    //     })
    // });
    // // Likes
    // socket.on("likeVideo", async (value) => {
    //   const data = await $fetch('/api/admin/video/like', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       video: value.video,
    //       userId: value.userId
    //     })
    //   }).then(async (res) => {
    //     io.emit("currentUserLike", res);
    //     await $fetch('/api/admin/video/like/' + value.video).then((res) => {
    //       const data = {
    //         videoId: value.video,
    //         likes: res.body
    //       }
    //       io.emit("updateLikesVideo", data);
    //       io.emit("videoLikesCount", res);
    //     })
    //   })
    // });
    // socket.on("deleteLike", async (value) => {
    //   await $fetch('/api/admin/video/like/' + value.id, {
    //          method: 'DELETE',
    //        }).then(async (res) => {
    //          await $fetch('/api/admin/video/like/' + value.video).then((res) => {
    //           const data = {
    //             videoId: value.video,
    //             likes: res.body
    //           }
    //           io.emit("updateLikesVideo", data);
    //           io.emit("videoLikesCount", res);
    //         })
    //      })
    //  });

  });
  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});
