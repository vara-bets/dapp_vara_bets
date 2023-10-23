import { useMemo } from "react"
import { useAccount } from "@gear-js/react-hooks"
import { ENV } from '@/app/consts'
import { useReadState } from "./use-metadata"
import meta from '@/assets/meta/vara_bets.meta.txt'
import { IGameConfig, IGameInstance, IGameStatus, IPlayer } from '@/app/types/game'
import { VaraBetsStates, Last, AllBets } from "../types/vara-bets-types"

export const programIdGame = ENV.GAME

export function useGameState() {
    const { account } = useAccount()

    const payloadGame = useMemo(
        () =>
            account?.decodedAddress
                ? {
                    Game: { player_address: account.decodedAddress },
                }
                : undefined,
        [account?.decodedAddress])

    const payloadConfig = useMemo(() => ({ Config: null }), [])
    const payloadAdmins = useMemo(() => ({ Admins: null }), [])
    const payloadPlayers = useMemo(() => ({ AllPlayers: null }), [])
    const payloadStatus = useMemo(() => ({ Status: null }), [])
    const payloadRounds = useMemo(() => ({ Rounds: null }), [])
    const payloadBlockNumber = useMemo(() => ({ BlockNumber: null}), [])
    const payloadTitle = useMemo(() => ({ Title: null }), [])
    //   Last(u64, String),
    const payloadLast = useMemo(() => ({ Last: null }), [])
    // BetsRoundState
    const payloadBetsRoundState = useMemo(() => ({ BetsRoundState: null }), [])

    const payloadAllBets = useMemo( () => ({ AllBets: null}), [])
    // payloadHashInserted
    const payloadHashInserted = useMemo( () => ({ HashInserted: null}), [])





    const { state: game, error } = useReadState<{ Game: IGameInstance }>({
        programId: programIdGame,
        meta,
        payload: payloadGame,
    })

    const { state: config } = useReadState<{ Config: IGameConfig | null }>({
        programId: programIdGame,
        meta,
        payload: payloadConfig,
    })

    const { state: players } = useReadState<{ AllPlayers: IPlayer[] }>({
        programId: programIdGame,
        meta,
        payload: payloadPlayers,
    })

    const { state: admins } = useReadState<{ Admins: string[] }>({
        programId: programIdGame,
        meta,
        payload: payloadAdmins,
    })

    const { state: status } = useReadState<{ Status: IGameStatus }>({
        programId: programIdGame,
        meta,
        payload: payloadStatus,
    })

    const {state: Rounds} = useReadState<{ Rounds: number}>({
        programId: programIdGame,
        meta,
        payload: payloadRounds,
    })

    console.log("Rounds: ", Rounds);

    const {state: BlockNumber} = useReadState<{ BlockNumber: number}>({
        programId: programIdGame,
        meta,
        payload: payloadBlockNumber
    })

    console.log("BlockNumber: ", BlockNumber);

    const {state: Title} = useReadState<{ Title: string}>({
        programId: programIdGame,
        meta,
        payload: payloadTitle
    })

    console.log("Title: ", Title);

    // const {state: Last} = useReadState<{ Last: Last}>({
    // Last 类型也可以用下面的方式直接在函数中定义
    // 但是有时候类型可能比较复杂

    const {state: Last} = useReadState<{ Last: [number, string]}>({
        programId: programIdGame,
        meta,
        payload: payloadLast
    })

    console.log("Last: ", Last);

    const {state: BetsRoundState} = useReadState<{ BetsRoundState: string}>({
        programId: programIdGame,
        meta,
        payload: payloadBetsRoundState
    })

    console.log("BetsRoundState: ", BetsRoundState?.BetsRoundState === 'DealerProofSubmission');

    const {state: AllBets} = useReadState<{ AllBets: AllBets}>({
        programId: programIdGame,
        meta,
        payload: payloadAllBets
    })

    console.log("AllBets: ", AllBets);

    // HashInserted(u64, String)
    const {state: HashInserted} = useReadState<{ HashInserted: [number, string]}>({
        programId: programIdGame,
        meta,
        payload: payloadHashInserted
    })

    console.log("HashInserted: ", HashInserted);



    return { game, config, players, admins, error, status, Rounds, BlockNumber, Title }
}