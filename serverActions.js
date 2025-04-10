'use server'
import prisma from "./libs/prisma"
export async function editFurniture(data) {

    console.log('ddadsadasdadadiffghdsjkgjkdhgksfjgdjkshs', data)

    await prisma.furnitureVariations.deleteMany({
        where: {
            colorsId: {
                notIn: data.colors.map(color => color.value)
            }
        }
    })


    const variations = await prisma.furnitureVariations.findMany({
        where: {
            size: {
                in: data.sizes.map(size => size)
            },
            colorsId: {
                in: data.colors.map(color => color.value)
            }
        }
    })
    variations.forEach((variation) => {
        data.colors.forEach(color => {
            data.sizes.forEach(async Size => {
                await prisma.furnitureVariations.upsert({
                    where: { id: variation.id },
                    update: {
                        furnitureId: data.id,
                        colorsId: color.value,
                        size: Size,
                    },
                    create: {
                        furnitureId: data.id,
                        colorsId: color.value,
                        size: Size,
                    }
                })
            })
        })
    })


    const resp = await prisma.furniture.update({
        where: {
            id: data.id
        },
        data: {
            name: data.title,
            category: data.category,
            price: Number(data.price),
            tags: {
                connect: data.tags.map(tag => ({ id: tag }))
            }
        }
    });
}

export async function getColorsOptions() {
    const tags = await prisma.colors.findMany()
    return tags
}
export async function getSizesOptions() {
    const sizes = await prisma.furnitureVariations.findMany()
    return sizes

}
export async function getTagsOptions() {
    const tags = await prisma.tag.findMany()
    return tags
}