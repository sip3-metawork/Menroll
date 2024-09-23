# Menroll

Metawork object enrollment system

We develop Menroll with next.js and  ORM Prisma.

# initial setup of database
npx prisma migrate dev --name init

# only seeding database. (not required for intiall time)
npx prisma db seed

# for Development
pnpm install
pnpm dev

# checking database 
npx prisma studio

## Model description

- Site : Experimental Site (Location) with several spots
- Spot : One set of robotic arm and camera systems(resources).
- Resource: Robotic arm, Camera, Sensors

### Model is written in "prisma/schema.prisma"

