interface ShelveProps {
    width: number;
    height: number;
    top: string;
    left: string;
    backgroundColor: string;
}

function Shelve({
        width,
        height,
        top,
        left,
        backgroundColor,
    }: ShelveProps) {

    return (
        <>
            <div className="shelve"
                style={{
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    position: 'absolute',
                    top: top,
                    left: left,
                }}
            >
            </div>
        </>
    )
}

export default Shelve;