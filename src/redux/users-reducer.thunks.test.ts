import {actions, follow, unfollow} from './users-reduser'
import {userAPI} from "../api/user-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-api')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>
let dispatchMock = jest.fn()
let getStateMock= jest.fn()
beforeEach(()=>{
     dispatchMock.mockClear()
     getStateMock.mockClear()
     // userAPI.follow.mockClear()
     // userAPI.unfollow.mockClear()
})

const result : APIResponseType = {
    resultCode:ResultCodesEnum.Success,
    messages:[],
    data:{}
}


// @ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))
// @ts-ignore
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
test('follow success thunk',async () => {

   const thunk = follow(1)

    await thunk(dispatchMock,getStateMock,{})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1,actions.toggleFollowingProgress(true,3))
    expect(dispatchMock).toHaveBeenCalledWith(2,actions.followSuccess(3))
    expect(dispatchMock).toHaveBeenCalledWith(3,actions.toggleFollowingProgress(false,3))

    expect(dispatchMock).toBeCalledTimes(3)
})



test('unfollow success thunk',async () => {

    const thunk = unfollow(1)
    // const dispatchMock = jest.fn()
    // const getStateMock = jest.fn()

    await thunk(dispatchMock,getStateMock,{})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1,actions.toggleFollowingProgress(true,3))
    expect(dispatchMock).toHaveBeenCalledWith(2,actions.followSuccess(3))
    expect(dispatchMock).toHaveBeenCalledWith(3,actions.toggleFollowingProgress(false,3))

    expect(dispatchMock).toBeCalledTimes(3)
})