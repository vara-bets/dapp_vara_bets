import { HexString } from '@polkadot/util/types';

export type VaraBetsStates = {
    // admins: string[]
    // games: IGame[]
    // players: IPlayer[]
    // config: IGameConfig
    // Rounds: number,
    // Title: string,
    // BlockNumber: number,

  }

//   All(VaraBetsStates),
//   Rounds(u64),
//   Last(u64, String),
//   Title(String),
//   BetsRoundState(gstd::Option<BetsRoundState>),
//   HashInserted(u64, String),
//   Beted (u64, ActorId, u128, u128, String),
//   AllBets(BTreeMap<u64, (u64, ActorId, u128, u128, String)>),
//   CardsInserted(String),
//   DistributedRewards(u64, ActorId, u128),
//   Url(Option<String>),
//   Whoami(ActorId),
//   BlockNumber(u32),
//   BlockTimestamp(u64),
//   ProgramId(ActorId),
//   MessageId(MessageId),


export type IBetsRoundState = 'GameStarted' | 'GameEnded'

// 定义查询函数 Last() 的返回值类型, 
export type Last = [number, string]
export type AllBets = [number, [number, string, number, number, string]]


export type BetsRoundState = {
    GameStarted: any,
    DealerProofSubmission: any,
    PlayerBetting: any,
    PlayerDecryption: any,
    DealerDecryption: any,
    RewardDistribution: any,
    GameEnded: any,
}