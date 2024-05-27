# Automašīnu Izīrēšanas Platforma

## Projekta apraksts
Projekts nodrošina automašīnu izirēšanas funkcionalitāti klientiem ar plašu marku un modeļu izvēli, intuitīvu lietototāju saskarni.
Administratoriem caur kontroles paneli ir pieejama platformas lietotāju un rezervāciju datu kontrole.

## Izmantotās tehnoloģijas
Projektā tiek pielietots:
- Next.JS
- TypeScript
- Prisma
- PostgreSQL

### Uzstādīšanas instrukcijas
Aizpildi .env datus pēc sekojošā piemēra
```
DATABASE_URL=postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=string
```
Instalē npm moduļus
```
npm install
```

Datubāzes migrācija
```
npx prisma migrate dev --name init
```

Programmas palaišana
```
npm run dev
```

### Papildus komandas

Prisma ORM ģenerācija
```
npx primsa generate
```
Datu bāzes datu aizpildīšana
```
npx prisma db seed
```

## Izmantotie avoti
- ER diagramma - https://www.lucidchart.com/pages/er-diagrams
- UML diagramma - https://www.lucidchart.com/pages/uml-use-case-diagram
- Datu plūsmas diagramma - https://www.lucidchart.com/pages/data-flow-diagram
- Next.js dokumentācija - https://nextjs.org/docs
- NextAuth.js dokumentācija - https://next-auth.js.org/getting-started/introduction
- Typescript dokumentācija - https://www.typescriptlang.org/
- React-toastify dokumentācija - https://fkhadra.github.io/react-toastify/introduction
- Tailwind CSS dokumentācija - https://tailwindcss.com/
- Prisma dokumentācija - https://www.prisma.io/
- PostgreSQL dokumentācija - https://www.postgresql.org/
