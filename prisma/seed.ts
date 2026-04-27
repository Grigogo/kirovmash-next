import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ─── Categories ───────────────────────────────────────────────────────────

  const [belt, roller] = await Promise.all([
    prisma.category.create({
      data: {
        slug: 'belt-conveyors',
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Ленточные конвейеры',
              description:
                'Конвейеры с несущим органом в виде ленты для транспортировки сыпучих и штучных грузов на расстояния до нескольких километров.',
            },
            {
              locale: 'en',
              name: 'Belt Conveyors',
              description:
                'Conveyors with a belt as the carrying element, designed to transport bulk and unit loads over distances of up to several kilometres.',
            },
          ],
        },
      },
    }),

    prisma.category.create({
      data: {
        slug: 'roller-conveyors',
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Роликовые конвейеры',
              description:
                'Конвейеры с опорными роликами для транспортировки тарных и штучных грузов в складской, производственной и логистической сферах.',
            },
            {
              locale: 'en',
              name: 'Roller Conveyors',
              description:
                'Roller-supported conveyors for transporting packaged and unit loads in warehouse, manufacturing, and logistics environments.',
            },
          ],
        },
      },
    }),

    prisma.category.create({
      data: {
        slug: 'services-and-spare-parts',
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Услуги и запасные части',
              description:
                'Монтаж, наладка, техническое обслуживание и поставка запасных частей для конвейерного оборудования.',
            },
            {
              locale: 'en',
              name: 'Services and Spare Parts',
              description:
                'Installation, commissioning, maintenance, and spare parts supply for conveyor equipment.',
            },
          ],
        },
      },
    }),
  ])

  // ─── Products ─────────────────────────────────────────────────────────────
  // belt-conveyors: 3 products (BC-500, BC-750, BC-1000)
  // roller-conveyors: 2 products (RC-250, RC-500)

  await Promise.all([
    prisma.product.create({
      data: {
        slug: 'bc-500',
        price: 420000,
        priceOnRequest: false,
        inStock: true,
        published: true,
        categoryId: belt.id,
        specs: {
          width: '500 мм',
          maxLength: '50 м',
          capacity: 'до 150 т/ч',
          beltSpeed: '0,5–2,5 м/с',
          motorPower: '7,5–15 кВт',
        },
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Ленточный конвейер BC-500',
              description:
                'Универсальный ленточный конвейер шириной 500 мм для транспортировки сыпучих материалов и мелкоштучных грузов. Производительность до 150 т/ч, длина секции до 50 м. Подходит для пищевой, горнодобывающей и строительной промышленности.',
            },
            {
              locale: 'en',
              name: 'Belt Conveyor BC-500',
              description:
                'Versatile belt conveyor with a 500 mm belt width for transporting bulk materials and small unit loads. Capacity up to 150 t/h, section length up to 50 m. Suitable for food, mining, and construction industries.',
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'bc-750',
        price: 680000,
        priceOnRequest: false,
        inStock: true,
        published: true,
        categoryId: belt.id,
        specs: {
          width: '750 мм',
          maxLength: '120 м',
          capacity: 'до 350 т/ч',
          beltSpeed: '0,8–3,2 м/с',
          motorPower: '22–55 кВт',
        },
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Ленточный конвейер BC-750',
              description:
                'Конвейер средней мощности с шириной ленты 750 мм для промышленных предприятий с высокой интенсивностью грузопотока. Производительность до 350 т/ч при длине трассы до 120 м. Рама из горячекатаного профиля, усиленные роликовые опоры.',
            },
            {
              locale: 'en',
              name: 'Belt Conveyor BC-750',
              description:
                'Medium-duty conveyor with a 750 mm belt width for industrial facilities with high material throughput. Capacity up to 350 t/h over a run length of up to 120 m. Hot-rolled steel frame with heavy-duty idler sets.',
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'bc-1000',
        price: null,
        priceOnRequest: true,
        inStock: true,
        published: true,
        categoryId: belt.id,
        specs: {
          width: '1000 мм',
          maxLength: '200 м',
          capacity: 'до 600 т/ч',
          beltSpeed: '1,0–4,0 м/с',
          motorPower: '55–160 кВт',
        },
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Ленточный конвейер BC-1000',
              description:
                'Тяжёлый конвейер шириной 1000 мм для горнодобывающей и металлургической промышленности. Производительность до 600 т/ч, трасса до 200 м, мощность привода 55–160 кВт. Комплектуется системой аварийного останова и датчиками схода ленты. Цена определяется по результатам технического задания.',
            },
            {
              locale: 'en',
              name: 'Belt Conveyor BC-1000',
              description:
                'Heavy-duty conveyor with a 1000 mm belt width for mining and metallurgical applications. Capacity up to 600 t/h, run length up to 200 m, drive power 55–160 kW. Equipped with an emergency stop system and belt-tracking sensors. Price is determined based on project specifications.',
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'rc-250',
        price: 85000,
        priceOnRequest: false,
        inStock: true,
        published: true,
        categoryId: roller.id,
        specs: {
          width: '250 мм',
          rollerDiameter: '50 мм',
          rollerPitch: '75–150 мм',
          maxLoadPerMetre: '200 кг/м',
          drive: 'гравитационный',
        },
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Роликовый конвейер RC-250',
              description:
                'Гравитационный роликовый конвейер шириной 250 мм для перемещения ящиков, поддонов и картонных коробок без привода. Диаметр роликов 50 мм, шаг 75–150 мм, нагрузка до 200 кг/м. Идеальное решение для сортировочных и комплектовочных участков.',
            },
            {
              locale: 'en',
              name: 'Roller Conveyor RC-250',
              description:
                'Gravity roller conveyor 250 mm wide for moving boxes, pallets, and cartons without a drive unit. Roller diameter 50 mm, pitch 75–150 mm, load capacity up to 200 kg/m. An ideal solution for sorting and order-picking stations.',
            },
          ],
        },
      },
    }),

    prisma.product.create({
      data: {
        slug: 'rc-500',
        price: 195000,
        priceOnRequest: false,
        inStock: false,
        published: true,
        categoryId: roller.id,
        specs: {
          width: '500 мм',
          rollerDiameter: '76 мм',
          speed: '0,1–0,6 м/с',
          maxLoadPerMetre: '500 кг/м',
          motorPower: '1,1–2,2 кВт',
          drive: 'приводной',
        },
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Приводной роликовый конвейер RC-500',
              description:
                'Приводной роликовый конвейер шириной 500 мм с регулируемой скоростью для автоматизированных производственных линий. Диаметр роликов 76 мм, нагрузка до 500 кг/м. Поставляется под заказ — срок изготовления 4–6 недель.',
            },
            {
              locale: 'en',
              name: 'Powered Roller Conveyor RC-500',
              description:
                'Powered roller conveyor 500 mm wide with variable speed control for automated production lines. Roller diameter 76 mm, load capacity up to 500 kg/m. Available to order — lead time 4–6 weeks.',
            },
          ],
        },
      },
    }),
  ])

  // ─── Services ─────────────────────────────────────────────────────────────

  await Promise.all([
    prisma.service.create({
      data: {
        slug: 'installation-and-commissioning',
        priceFrom: 35000,
        published: true,
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Монтаж и пусконаладка',
              description:
                'Профессиональный монтаж конвейерного оборудования под ключ: от фундаментных работ и установки металлоконструкций до подключения электропривода, настройки автоматики и обучения операторов. Гарантия на монтаж — 24 месяца.',
            },
            {
              locale: 'en',
              name: 'Installation and Commissioning',
              description:
                'Turnkey installation of conveyor equipment: from foundation work and steelwork erection to drive connection, control system setup, and operator training. 24-month installation warranty.',
            },
          ],
        },
      },
    }),

    prisma.service.create({
      data: {
        slug: 'maintenance-and-repair',
        priceFrom: 15000,
        published: true,
        translations: {
          create: [
            {
              locale: 'ru',
              name: 'Техническое обслуживание и ремонт',
              description:
                'Плановое ТО, диагностика неисправностей, ремонт и замена изнашиваемых элементов конвейерного оборудования. Сервисные договоры с фиксированным временем отклика. Выезд специалиста в пределах региона — в течение 24 часов.',
            },
            {
              locale: 'en',
              name: 'Maintenance and Repair',
              description:
                'Scheduled maintenance, fault diagnosis, repair, and replacement of wearing parts for conveyor equipment. Service contracts with guaranteed response times. On-site engineer within the region — within 24 hours.',
            },
          ],
        },
      },
    }),
  ])

  // ─── Summary ──────────────────────────────────────────────────────────────

  const [catCount, catTransCount, prodCount, prodTransCount, svcCount, svcTransCount] =
    await Promise.all([
      prisma.category.count(),
      prisma.categoryTranslation.count(),
      prisma.product.count(),
      prisma.productTranslation.count(),
      prisma.service.count(),
      prisma.serviceTranslation.count(),
    ])

  console.log('Seed completed:')
  console.log(`  Categories:             ${catCount}  (translations: ${catTransCount})`)
  console.log(`  Products:               ${prodCount}  (translations: ${prodTransCount})`)
  console.log(`  Services:               ${svcCount}  (translations: ${svcTransCount})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
