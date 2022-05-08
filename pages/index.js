import Image from "next/image"
import fs from "fs"
import imageSize from "image-size"
import NavBar from "../components/NavBar"
import { Carousel } from "react-bootstrap"
import style from "../styles/index.module.scss"

const carouselImagePrefix = "/HomeCarousel/"
function ImageCarousel({ images }) {
    return (
        <Carousel>
            {images.map((image, id) => (
                <Carousel.Item key={id}>
                    <Image 
                        src={carouselImagePrefix + image.src} 
                        alt="picture from image carousel"
                        width={image.width} height={image.height}
                        layout="raw" className={style.image}
                    />

                    <Carousel.Caption>
                        <h3>Hello world!</h3>
                        <p>test hello world</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default function Home({carouselImages}) {
    return (
        <>
            <NavBar />
            <ImageCarousel images={carouselImages} />
        </>
    )
}

export function getServerSideProps(context) {
    let imagePaths = fs.readdirSync("public/HomeCarousel")
    let carouselImages = []
    imagePaths.forEach((path) => {
        const dimensions = imageSize("public" + carouselImagePrefix + path)
        carouselImages.push(
            {
                src: path, 
                width: dimensions.width, 
                height: dimensions.height
            }
        )
    })

    return {
        props: {
            carouselImages
        }
    }

}