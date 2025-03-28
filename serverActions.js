'use server'
import prisma from "./libs/prisma"
export async function editFurniture(formData) {

    const Variations = prisma.furnitureVariations.findMany({
        where: {
            furnitureId: 6
        }
    })

    const resp = prisma.furniture.update({
        where: {
            id: formData.get('id')
        },
        data: {
            name: formData.get('name'),
            price: formData.get('price'),
            category: formData.get('category'),
            variations: {
                update: {
                    where: {
                        furnitureId: formData.get('id')
                    },
                    data: {
                        size: formData.get('size'),
                        color: {
                            update: {

                            }
                        }

                    }
                }
            }

        }
    })

    const Delete = prisma.furnitureVariations.delete({
        where: {
            furnitureId: formData.get('id'),
            colorsId: {
                notIn: [1, 6, 9] // Тут должны быть те которые остались - хорошие!
            }
        }
    })

    const variations = prisma.furnitureVariations.create({
        data: {
            colorsId: {

            }
        }
    })
}