class Job {

    constructor(id, name, fabricatorId, fabricatorName, status, favorite) {
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

module.exports = Job