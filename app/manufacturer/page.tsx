import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function manufacturer() {
    const manufacturers = await prisma.manufacturer.findMany({
        select: {
            name: true
        }
    })

    return (
        <>
            {manufacturers.map(manufacturer => (
                <div key={manufacturer.name}>{manufacturer.name}</div>
            ))}
        </>
    )
}
