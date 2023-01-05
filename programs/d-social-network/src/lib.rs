use anchor_lang::prelude::*;

declare_id!("5dgW78UWc7hT4jxgh4XYr4NN6rcqDUndg7JzzUeGCskL");

#[program]
pub mod d_social_network {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
