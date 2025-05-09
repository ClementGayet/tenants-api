# 🏢 Tenants API

A NestJS microservice for managing tenants (clients/accounts) in a multi-tenant application architecture. Each tenant has a unique license and customizable JSON attributes.

---

## 📦 Features

* Create, read, update, and delete tenants.
* JSONB support for flexible `attributes`.
* UUID-based tenant identification.
* OpenAPI (Swagger) documentation.
* Returns `Location` header on creation and update (RESTful best practices).
* Role-based access control (e.g., admin-only routes).

---

## 📚 API Documentation

Available at: `http://localhost:<PORT>/api-docs`

## ⚙️ Tech Stack

* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/) (with `jsonb` support)
* [Swagger](https://swagger.io/)
* [class-validator](https://github.com/typestack/class-validator)
* [express / response headers](https://expressjs.com/)

---

## 🔐 Security & Roles

* Decorators like `@Roles(['admin'])` used to restrict access.
* Compatible with custom guards or authentication middleware.

---

## 🧠 Setup

```bash
# install deps
npm install

# run dev
npm run start:dev

# run prod
npm run start:prod

# build
npm run build
```

---

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

---

## ✍️ Maintainer

Clément Gayet

---

## 📄 License

MIT
