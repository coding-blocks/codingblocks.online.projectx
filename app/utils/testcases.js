export const isPassedTestcase = tc => ["success", "correct"].includes(tc.result)

export const isValidResult = result => result.data && result.data.testcases