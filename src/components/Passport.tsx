import React, { useEffect, useState } from 'react'
import { Box, Text, Icon, Link, Button } from '@chakra-ui/react'
import { PassportReader } from '@gitcoinco/passport-sdk-reader'
import { Passport, Stamp } from '@gitcoinco/passport-sdk-types'
import { X, CircleWavyCheck } from 'phosphor-react'

import { useActiveWeb3React } from 'hooks'
import { IS_WHITELABEL } from 'constants/index'
import GitcoinPassport from 'components/GitcoinPassport'

// TODO: move to config file
export const CERAMIC_PASSPORT = 'https://ceramic.passport-iam.gitcoin.co'

export const NUMBER_OF_STAMP_REQUIRED = 3

// Gitcoin
export const ALLOWED_ISSUER =
  'did:key:z6MkghvGHLobLEdj1bgRLhS4LPGJAvbMA1tn2zcRyqmYU5LC'

const reader = new PassportReader(CERAMIC_PASSPORT, '1')

export interface Stamps {
  [key: string]: Stamp
}

export const filterValidStamps = (stamps: Stamp[]): Stamp[] => {
  // const currentTimestamp = 1665401965000
  const currentTimestamp = Date.now()
  return stamps?.filter(
    (stamp) =>
      stamp.credential.issuer === ALLOWED_ISSUER &&
      Date.parse(stamp.credential.expirationDate) > currentTimestamp
  )
}

export const getNumberOfValidStamps = (stamps: Stamps): number | null => {
  if (stamps === null) return null
  const array = Object.values(stamps)
  if (!array.length) {
    return 0
  }
  return filterValidStamps(Object.values(stamps)).length
}

export const OkIcon = (
  <Icon as={CircleWavyCheck} color="green" display="inline" />
)
export const KoIcon = <Icon as={X} color="red" display="inline" />

const PassportComponent = ({
  displayStamps,
}: {
  displayStamps?: boolean
}): JSX.Element => {
  const [stamps, setStamps] = useState(null)
  const { account } = useActiveWeb3React()

  async function getData() {
    const passport: Passport = await reader.getPassport(account)
    // console.log('passport', passport)
    const stamps = {}
    if (passport) {
      for (const stamp of passport?.stamps) {
        stamps[stamp.provider] = stamp
      }
    }
    // console.log('stamps', stamps)
    setStamps(stamps)
  }

  useEffect(() => {
    if (account) getData()
    else {
      setStamps(null)
    }
  }, [account])

  const numberOfValidStamps = getNumberOfValidStamps(stamps)

  const explorerStatus =
    numberOfValidStamps !== null
      ? numberOfValidStamps >= NUMBER_OF_STAMP_REQUIRED
      : null

  return (
    <>
      <Box mb={6}>
        <Text fontSize="2xl">
          {'Explorer 👨‍🚀 status: '}
          {!account && '⚠️ Connect your wallet first'}
          {explorerStatus === true
            ? OkIcon
            : explorerStatus === false && (
                <>
                  {KoIcon}
                  <br />
                  {numberOfValidStamps < NUMBER_OF_STAMP_REQUIRED && (
                    <>
                      {`Go to `}
                      <Link href="https://passport.gitcoin.co/" target="_blank">
                        Gitcoin Passport
                      </Link>
                      {` and collect ${
                        NUMBER_OF_STAMP_REQUIRED - numberOfValidStamps
                      } more stamps`}
                    </>
                  )}
                </>
              )}
        </Text>
      </Box>
      {/* TODO: add refresh button */}
      {!IS_WHITELABEL && (
        <GitcoinPassport stamps={stamps} displayStamps={displayStamps} />
      )}
      <Box textAlign="center" mb={6}>
        <Button variant="outline" onClick={() => getData()}>
          Refresh Stamps
        </Button>
      </Box>
    </>
  )
}

export default PassportComponent
