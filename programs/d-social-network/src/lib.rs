use anchor_lang::prelude::*;

declare_id!("c66C85hHCyaUJ6oYXdSRN381J1GY1Re2RTHkd8uis78");

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
        post.comment_count = 0;
        post.like_count = 0;

        Ok(())
    }

    pub fn like_post(ctx: Context<LikePost>) -> Result<()> {
        let post = &mut ctx.accounts.post;
        post.like_count += 1;

        post.likers.push(ctx.accounts.authority.key());

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

#[derive(Accounts)]
pub struct LikePost<'info> {
    #[account(mut)]
    pub post: Account<'info, Post>,
    pub authority: Signer<'info>,
}


#[account]
pub struct Post {
    pub creator: Pubkey,
    pub timestamp: i64,
    pub content: String,
    pub comment_count: u64,
    pub like_count: u64,
    pub likers: Vec<Pubkey>
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