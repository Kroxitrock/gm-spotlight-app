interface CharacterCardProps {
    color: string
}

export default function CharacterCardGem({color}: CharacterCardProps) {
    return (
        <div className="h-full min-h-10 aspect-square p-1 bg-border [clip-path:polygon(40%_0,0_40%,0_60%,40%_100%,60%_100%,100%_60%,100%_40%,60%_0)]">
            <div className="h-full aspect-square [clip-path:polygon(40%_0,0_40%,0_60%,40%_100%,60%_100%,100%_60%,100%_40%,60%_0)]" style={{backgroundColor: color}}></div>
        </div>
    )
}