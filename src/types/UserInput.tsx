export type UserInput = {
    username: string,
    password: string, 
    confirmedPassword: string,
    oldUsername: boolean,
    isTouched: boolean,
};

export const userInputDefaultState: UserInput = {
    username            : '',
    password            : '',
    confirmedPassword   : '',
    oldUsername         : false,
    isTouched           : false,
};