import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ─── Categories ───────────────────────────────────────────────────────────

  const belt = await prisma.category.upsert({
    where: { slug: 'lentochnye-konveyery' },
    update: {},
    create: {
      name: 'Ленточные конвейеры',
      slug: 'lentochnye-konveyery',
      description:
        'Конвейеры с несущим органом в виде ленты для транспортировки сыпучих и штучных грузов на расстояния до нескольких километров.',
    },
  })

  const roller = await prisma.category.upsert({
    where: { slug: 'rolikovye-konveyery' },
    update: {},
    create: {
      name: 'Роликовые конвейеры',
      slug: 'rolikovye-konveyery',
      description:
        'Конвейеры с опорными роликами для транспортировки тарных и штучных грузов в складской, производственной и логистической сферах.',
    },
  })

  const chain = await prisma.category.upsert({
    where: { slug: 'tsepnye-konveyery' },
    update: {},
    create: {
      name: 'Цепные конвейеры',
      slug: 'tsepnye-konveyery',
      description:
        'Конвейеры с тяговым элементом в виде цепи для транспортировки тяжёлых, горячих и абразивных грузов в тяжёлых условиях эксплуатации.',
    },
  })

  // ─── Products ─────────────────────────────────────────────────────────────

  await prisma.product.upsert({
    where: { slug: 'bc-500' },
    update: {},
    create: {
      name: 'Ленточный конвейер BC-500',
      slug: 'bc-500',
      description:
        'Универсальный ленточный конвейер шириной 500 мм для транспортировки сыпучих материалов. Производительность до 150 т/ч, длина секции до 50 м.',
      images: [],
      specs: {
        width: '500 мм',
        length: 'до 50 м',
        capacity: 'до 150 т/ч',
        speed: '0,5–2,5 м/с',
        motorPower: '7,5–15 кВт',
      },
      price: 420000,
      priceOnRequest: false,
      inStock: true,
      published: true,
      categoryId: belt.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'bc-1000' },
    update: {},
    create: {
      name: 'Ленточный конвейер BC-1000',
      slug: 'bc-1000',
      description:
        'Тяжёлый ленточный конвейер шириной 1000 мм для горнодобывающей и металлургической промышленности. Производительность до 600 т/ч.',
      images: [],
      specs: {
        width: '1000 мм',
        length: 'до 200 м',
        capacity: 'до 600 т/ч',
        speed: '1,0–4,0 м/с',
        motorPower: '55–160 кВт',
      },
      priceOnRequest: true,
      inStock: true,
      published: true,
      categoryId: belt.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'rc-250' },
    update: {},
    create: {
      name: 'Роликовый конвейер RC-250',
      slug: 'rc-250',
      description:
        'Гравитационный роликовый конвейер для перемещения ящиков, поддонов и картонных коробок. Не требует привода.',
      images: [],
      specs: {
        width: '250 мм',
        rollerDiameter: '50 мм',
        rollerStep: '75–150 мм',
        maxLoad: '200 кг/м',
      },
      price: 85000,
      priceOnRequest: false,
      inStock: true,
      published: true,
      categoryId: roller.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'rc-500' },
    update: {},
    create: {
      name: 'Роликовый конвейер RC-500',
      slug: 'rc-500',
      description:
        'Приводной роликовый конвейер шириной 500 мм с регулируемой скоростью для автоматизированных производственных линий.',
      images: [],
      specs: {
        width: '500 мм',
        rollerDiameter: '76 мм',
        speed: '0,1–0,6 м/с',
        maxLoad: '500 кг/м',
        motorPower: '1,1–2,2 кВт',
      },
      price: 195000,
      priceOnRequest: false,
      inStock: false,
      published: true,
      categoryId: roller.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'cc-800' },
    update: {},
    create: {
      name: 'Цепной конвейер CC-800',
      slug: 'cc-800',
      description:
        'Скребковый цепной конвейер для транспортировки горячих, острых и абразивных материалов: металлическая стружка, зола, клинкер.',
      images: [],
      specs: {
        width: '800 мм',
        chainType: 'Двухрядная пластинчатая',
        capacity: 'до 80 т/ч',
        temperature: 'до 400 °C',
        motorPower: '11–30 кВт',
      },
      priceOnRequest: true,
      inStock: true,
      published: true,
      categoryId: chain.id,
    },
  })

  // ─── Services ─────────────────────────────────────────────────────────────

  await prisma.service.upsert({
    where: { slug: 'montazh-i-naladka' },
    update: {},
    create: {
      name: 'Монтаж и наладка',
      slug: 'montazh-i-naladka',
      description:
        'Профессиональный монтаж конвейерного оборудования под ключ: от фундаментных работ до пусконаладки и обучения персонала. Гарантия на монтаж — 24 месяца.',
      images: [],
      priceFrom: 35000,
      published: true,
    },
  })

  await prisma.service.upsert({
    where: { slug: 'tekhnicheskoe-obsluzhivanie' },
    update: {},
    create: {
      name: 'Техническое обслуживание и ремонт',
      slug: 'tekhnicheskoe-obsluzhivanie',
      description:
        'Плановое ТО, диагностика, ремонт и замена изнашиваемых элементов конвейерного оборудования. Договоры на сервисное обслуживание с выездом специалиста.',
      images: [],
      priceFrom: 15000,
      published: true,
    },
  })

  console.log('Seed completed: 3 categories, 5 products, 2 services')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
