import Image from "next/image"
const HomePage = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg)'}}>
                {/* <Image  src={`https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg`} width={200} height={200}  alt="test-img"/> */}
                <div className="hero-overlay bg-opacity-55"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5  font-semibold text-md">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Learn More </button>
                    </div>
                </div>
            </div></div>
    )
}
export default HomePage