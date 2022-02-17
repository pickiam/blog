function longestPalindrome(s) {
    const len = s.length
    if (len < 2) {
        return s
    }
    let maxLen = 1
    let begin = 0
    const dp = new Array(len)
    for (let i = 0; i < len; i++) {
        dp[i] = new Array(len)
        dp[i][i] = true
    }
    console.log(dp)
}
longestPalindrome('434343')