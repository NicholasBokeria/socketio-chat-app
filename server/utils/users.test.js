const expect = require('expect')
const { Users } = require('./users')

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users()
        
        users.users = [{
            id: '1',
            name: 'Nikoloz',
            room: 'test room'
        }, {
            id: '2',
            name: 'Nicholas',
            room: 'test room'
        }, {
            id: '3',
            name: 'Nick',
            room: 'development room'
        }]
    })

    it('should add new user', () => {
        let users = new Users();
        
        let user = {
            id: '1234',
            name: 'Nikoloz',
            room: 'cookies'
        }

        users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })

    it('should remove a user', () => {
        let userId = '1'
        let user = users.removeUser(userId)

        expect(user[0].id).toBe(userId)
        expect(users.users.length).toBe(2)
    })

    it('should not remove a user', () => {
        let userId = '99'
        let user = users.removeUser(userId)

        expect(user).toEqual([])
        expect(users.users.length).toBe(3)
    })

    it('should find user', () => {
        let userId = 2;
        let user = users.getUser(userId)
        expect(user.id).toBe()
    })

    it('should not find a user', () => {
        let userId = 99;
        let user = users.getUser(userId)
        expect(user.id).toNotExist()
    })

    it('should return names for test room', () => {
        let userList = users.getUserList('test room')
        expect(userList).toEqual(['Nikoloz', 'Nicholas'])
    })

    it('should return names for development room', () => {
        let userList = users.getUserList('development room')
        expect(userList).toEqual(['Nick'])
    })
})