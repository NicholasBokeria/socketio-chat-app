let expect = require('expect')

let {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let user = {
            from: 'Nika',
            text: 'Hey hey'
        }
        let res = generateMessage(user.from, user.text);

        expect(res.from).toBe(user.from)
        expect(res.text).toBe(user.text)
        expect(res.createdAt).toBeA('number')
    })
})
