const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const initialSiteData = [
    {
        name: 'KawaguchiLab',
        spots: {
            create: [
                {
                    name: 'CenterDesk',
                    resources: {
                        create: [
                            {
                                name: 'DOBOT Nova2',
                                type: 1,//ROBOT_ARM,
                                desc: '{"mqttServer": "sora2.uclab.jp","mqttTopic": "arm/nu_nova2"}'
                            },
                            {
                                name: 'DualCAM',
                                type: 3,//DUAL_CAMERA,
                                desc: '{"webRTCServer": "sora2.uclab.jp", "webRTCChannel": "sora"}'
                            }
                        ]
                    }
                },
            ],
        },
    },
    {
        name: 'IBNorth917',
        spots: {
            create: [
                {
                    name: 'JAKA_Base',
                    resources: {
                        create: [
                            {
                                name: 'Zu5s',
                                type: 1, //ROBOT_ARM,
                                desc: '{"mqttServer": "sora2.uclab.jp","mqttTopic": "arm/nu_jaka"}'
                            },
                            {
                                name: 'WebCAM',
                                type: 2, //SINGLE_CAMERA,
                                desc: '{"webRTCServer": "ws://sora2.uclab.jp:5000/signaling", "webRTCChannel": "nu_jaka"}'
                            }

                        ]
                    }

                },
                {
                    name: 'UR5_Base',
                    resources: {
                        create: [
                            {
                                name: 'UR5e',
                                type: 1,//ROBOT_ARM,
                                desc: '{"mqttServer": "sora2.uclab.jp","mqttTopic": "arm/nu_ur5e"}'
                            }
                        ]
                    }

                },
            ],
        },
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of initialSiteData) {
        const sites = await prisma.site.create({
            data: u,
        })
        console.log(`Created site with id: ${sites.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
