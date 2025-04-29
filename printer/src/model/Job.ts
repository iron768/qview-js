class Job {

    id: number
    name: string
    fabricatorId: number
    fabricatorName: string
    status: string
    favorite: boolean
    released: number
    selfPause: number
    progress: number
    sentLines: number
    timeStarted: number
    extruded: number
    jobTime: [number, number, number]
    maxLayerHeight: number
    currentLayerHeight: number
    filament: string

    constructor(
        id: number, 
        name: string, 
        fabricatorId: number, 
        fabricatorName: string, 
        status: string, 
        favorite: boolean
    ) {
        this.id = id
        this.name = name
        this.fabricatorId = fabricatorId
        this.fabricatorName = fabricatorName
        this.status = status
        this.favorite = favorite

        this.released = 0
        this.selfPause = 0
        this.progress = 0
        this.sentLines = 0
        this.timeStarted = 0
        this.extruded = 0
        this.jobTime = [0, 0, 0]
        this.maxLayerHeight = 0
        this.currentLayerHeight = 0
        this.filament = ''
    }
    
}

export default Job