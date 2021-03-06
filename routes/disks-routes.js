const Router = require('express')

const disksHandlers = require("../handlers/disks-handlers")
const checkAuth = require("../middleware/checkAuth")

const router = new Router()

router.get('/own-disks', checkAuth, disksHandlers.getListOwnDisks)
router.get('/free-disks', checkAuth, disksHandlers.getListFreeDisks)
router.get('/disks-taken-by-person', checkAuth, disksHandlers.getListDisksTakenByPerson)
router.get('/disks-taken-from-person', checkAuth, disksHandlers.getListDisksTakenFromPerson)
router.put('/give', checkAuth, disksHandlers.giveAwayDisk)
router.put('/take', checkAuth, disksHandlers.takeDisk)

module.exports = router