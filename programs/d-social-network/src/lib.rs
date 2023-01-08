use anchor_lang::prelude::*;

declare_id!("5dgW78UWc7hT4jxgh4XYr4NN6rcqDUndg7JzzUeGCskL");

#[program]
pub mod d_social_network {
    use super::*;

    pub fn post_send(ctx: Context<SendPost>, content: String) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let creator: &Signer = &ctx.accounts.creator;
        let time: Clock = Clock::get().unwrap();

        if content.chars().count() > 320 {
            return Err(ErrorCode::ContentIsLong.into())
        }

        post.creator = *creator.key;
        post.timestamp = time.unix_timestamp;
        post.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(init, payer = creator, space = Post::LEN)]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
pub struct Post {
    pub creator: Pubkey,
    pub timestamp: i64,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBKEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4;
const CONTENT_LENGTH: usize = 320 * 4;

impl Post {
    const LEN: usize = DISCRIMINATOR_LENGTH + PUBKEY_LENGTH + TIMESTAMP_LENGTH + STRING_LENGTH_PREFIX + CONTENT_LENGTH;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Content has max length 320 characters.")]
    ContentIsLong,
}