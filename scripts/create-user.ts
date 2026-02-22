import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]
  const name = process.argv[4]

  if (!email || !password) {
    console.error('Usage: npm run create-user -- <email> <password> [name]')
    process.exit(1)
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password, // Note: In a production app, you should hash the password!
        name,
      },
    })
    console.log(`Created user with id: ${user.id}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
