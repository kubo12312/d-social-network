use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("DyZ8qnErBbmKqCW2X6Nj1Cat8imPjStjWu1cGwAAhLSQ");

const CONTENT_LENGTH: usize = 1024;

#[program]
pub mod d_social_network {
    use super::*;

    pub fn create_state(
        ctx: Context<CreateState>,
    ) -> Result<()> {
        // Get state from context
        let state = &mut ctx.accounts.state;
        // Save authority to state
        state.authority = ctx.accounts.authority.key();
        // Set post count as 0 when initializing
        state.post_count = 0;
        Ok(())
    }

    pub fn send_post(ctx: Context<SendPost>, content: String) -> Result<()> {
        let state = &mut ctx.accounts.state;

        let post = &mut ctx.accounts.post;

        post.authority = ctx.accounts.authority.key();
        post.content = content;
        post.comment_count = 0;
        post.index = state.post_count;
        post.post_time = ctx.accounts.clock.unix_timestamp;

        state.post_count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateState<'info> {
    // Authenticating state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8
    )]
    pub state: Account<'info, StateAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateAccount>,

    #[account(
        init,
        // Post account use string "post" and index of post as seeds
        seeds = [b"post".as_ref(), state.post_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<Post>() + CONTENT_LENGTH
    )]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct StateAccount {
    pub authority: Pubkey,

    pub post_count: u64,
}


#[account]
pub struct Post {
    pub authority: Pubkey,
    pub post_time: i64,
    pub content: String,
    pub comment_count: u64,
    pub index: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Content has max length 320 characters.")]
    ContentIsLong,
}