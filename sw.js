self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : { title: "Амир (Cypher)", body: "Новое сообщение" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "https://api.dicebear.com/9.x/shapes/png?seed=cypher&backgroundColor=080a0e",
      badge: "https://api.dicebear.com/9.x/shapes/png?seed=cypher&backgroundColor=080a0e",
      vibrate: [100, 50, 100],
      data: { url: "./index.html" }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("./index.html");
    })
  );
});
