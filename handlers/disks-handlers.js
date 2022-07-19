const db = require('../db/db')

module.exports = {
    getListOwnDisks: async (req, res) => {
        try {
            const disks = await db.getOwnDisks(req.session.person_id)
            res.json({status: 'OK', title: 'Мои диски', disks})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    getListFreeDisks: async (req, res) => {
        try {
            const disks = await db.getFreeDisks(req.session.person_id)
            res.json({status: 'OK', title: 'Свободные диски', disks})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    getListDisksTakenByPerson: async (req, res) => {
        try {
            const disks = await db.getDisksTakenByPerson(req.session.person_id)
            res.json({status: 'OK', title: 'Диски, взятые мной', disks})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    getListDisksTakenFromPerson: async (req, res) => {
        try {
            const disks = await db.getDisksTakenFromPerson(req.session.person_id)
            res.json({status: 'OK', title: 'Диски, взятые у меня', disks})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    giveAwayDisk: async (req, res) => {
        try {
            const diskId = req.query.id
            if(!diskId) {
                return res.status(400).json({status: 'error', msg: 'Вы не ввели ID диска'})
            }
            const takenItem = await db.getTakenItem(diskId)
            if(!takenItem) {
                return res.status(404).json({status: 'error', msg: 'Такого диска не существует'})
            }
            if(takenItem.ownerid == req.session.person_id) {
                return res.status(409).json({status: 'error', msg: 'Это ваш собственный диск!'})
            }
            if(takenItem.holderid != req.session.person_id) {
                return res.status(409).json({status: 'error', msg: 'Вы не брали этот диск!'})
            }
            await db.giveDisk(diskId)
            return res.json({status: 'OK', msg: 'Диск был успешно возвращён!'})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    },
    takeDisk: async (req, res) => {
        try {
            const diskId = req.query.id
            if(!diskId) {
                return res.status(400).json({status: 'error', msg: 'Вы не ввели ID диска'})
            }
            const takenItem = await db.getTakenItem(diskId)
            if(!takenItem) {
                return res.status(404).json({status: 'error', msg: 'Такого диска не существует'})
            }
            if(takenItem.ownerid == req.session.person_id) {
                return res.status(409).json({status: 'error', msg: 'Это ваш собственный диск!'})
            }
            if(takenItem.holderid == req.session.person_id) {
                return res.status(409).json({status: 'error', msg: 'Вы уже взяли этот диск!'})
            }
            if(takenItem.ownerid != takenItem.holderid) {
                return res.status(409).json({status: 'error', msg: 'Этот диск уже взят другим пользователем!'})
            }
            await db.takeDisk(req.session.person_id, diskId)
            res.json({status: 'OK', msg: 'Диск был успешно взят!'})
        } catch (err) {
            res.status(500).json({status: 'error', msg: 'Произошла ошибка: ' + err.message})
        }
    }
}