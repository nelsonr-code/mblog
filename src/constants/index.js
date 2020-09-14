const POSTING_TIMES = Object.freeze({
  morning: "8-10",
  midday: "12-14",
  evening: "18-20"
})

/*On REPOST_STATES change update the sme constant in the frontend*/
const REPOST_STATES = Object.freeze({
  NOT_REPOSTED: 0,
  REPOSTING_STAGE_ONE: 1,
  REPOSTING_STAGE_TWO: 2,
  REPOSTED_AUTOMATIC: 3,
  REPOSTED_MANUAL: 5,
  IGNORED: 4,
  FAILED: 10
})

/*On YT_PUBLICATION_STATES change update the sme constant in the frontend*/
const YT_PUBLICATION_STATES = Object.freeze({
  UNLISTED: "unlisted",
  PRIVATE: "private",
  PUBLIC: "public"
})

module.exports = {
  POSTING_TIMES: POSTING_TIMES,
  REPOST_STATES: REPOST_STATES,
  YT_PUBLICATION_STATES: YT_PUBLICATION_STATES
}
