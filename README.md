# Automašīnu Izīrēšanas Platforma

## Projekta apraksts
Projekts nodrošina automašīnu izirēšanas funkcionalitāti klientiem ar plašu marku un modeļu izvēli, intuitīvu lietototāju saskarni.
Administratoriem caur kontroles paneli ir pieejama platformas lietotāju un produktu datu kontrole.

## Izmantotās tehnoloģijas
Projektā tiek izmantots:
- Next.JS
- TypeScript
- Prisma
- PostgreSQL

## Izmantotie avoti
- Sadaļa tiks papildināta izstrādes laikā

### Uzstādīšanas instrukcijas
- Aizpildi .env datus:
```
DATABASE_URL=postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=string
```
- Instalē npm modules:
```
npm install
```

- Datubāzes migrācija
```
npx prisma migrate dev --name init
```

- Palaid programmu
```
npm run dev
```

### Citas komandas:

- Prisma ORM ģenerācija:
```
npx primsa generate
```
- Datu bāzes datu seed:
```
npx prisma db seed
```