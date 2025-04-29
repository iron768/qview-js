import Fabricator from '../model/Fabricator'

class FabricatorRepository {
    private fabricators: Fabricator[]

    constructor() {
        this.fabricators = []
    }

    setupTestFabricators(): void {
        const testFabricator = new Fabricator(
            1,
            'Test Fabricator',
            'HWID123',
            'TestModel',
            'EmulatedPrinter',
            new Date().toISOString(),
            '/dev/EMU'
        )
        
        this.fabricators.push(testFabricator)
    }

    getFabricators(): Fabricator[] {
        return this.fabricators
    }

    getFabricatorById(id: number): Fabricator | undefined {
        return this.fabricators.find(fabricator => fabricator.id === id)
    }

    connectPrinter(id: number): boolean {
        const fabricator = this.getFabricatorById(id)
        
        if (!fabricator) {
            return false
        }

        fabricator.setupSerialPort()
        
        return true
    }
}

export default FabricatorRepository