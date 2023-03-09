use anchor_lang::prelude::*;

declare_id!("F8DFBtqs4hFHqmiJtmyyoFJKwgJ5sTBUsrNtuVxshaH");

#[program]
pub mod d_social_network {
    use super::*;

    pub fn post_send(ctx: Context<SendPost>, content: String, creator_name: String) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let creator: &Signer = &ctx.accounts.creator;
        let time: Clock = Clock::get().unwrap();

        if content.chars().count() > 1024 {
            return Err(ErrorCode::ContentIsLong.into())
        }

        post.creator = *creator.key;
        post.timestamp = time.unix_timestamp;
        post.creator_name = creator_name;
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

    pub fn post_unlike(ctx: Context<UnlikePost>) -> Result<()> {
        let post = &mut ctx.accounts.post;
        let authority = &ctx.accounts.authority;

        if let Some(index) = post.likers.iter().enumerate().find_map(|(i, liker)| {
            if liker == authority.key {
                Some(i)
            } else {
                None
            }
        }) {
            post.like_count -= 1;
            post.likers.remove(index);
        }
    
        Ok(())
    }

    pub fn comment_send(ctx: Context<CommentSend>, content: String) -> Result<()> {
        let comment: &mut Account<Comment> = &mut ctx.accounts.comment;
        let creator: &Signer = &ctx.accounts.creator;
        let time: Clock = Clock::get().unwrap();

        if content.chars().count() > 320 {
            return Err(ErrorCode::ContentIsLong.into())
        }

        comment.creator = *creator.key;
        comment.timestamp = time.unix_timestamp;
        comment.content = content;

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

#[derive(Accounts)]
pub struct UnlikePost<'info> {
    #[account(mut)]
    post: Account<'info, Post>,
    authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CommentSend<'info> {
    #[account(init, payer = creator, space = Comment::LEN)]
    pub comment: Account<'info, Comment>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Post {
    pub creator: Pubkey,
    pub timestamp: i64,
    pub creator_name: String,
    pub content: String,
    pub comment_count: u64,
    pub like_count: u64,
    pub likers: Vec<Pubkey>
}

#[account]
pub struct Comment {
    pub creator: Pubkey,
    pub timestamp: i64,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBKEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4;
const CONTENT_LENGTH: usize = 1024 * 4;
const CREATOR_NAME_LENGTH: usize = 32 * 4;

impl Post {
    const LEN: usize = DISCRIMINATOR_LENGTH + PUBKEY_LENGTH + TIMESTAMP_LENGTH + STRING_LENGTH_PREFIX + CREATOR_NAME_LENGTH + STRING_LENGTH_PREFIX + CONTENT_LENGTH;
}

impl Comment {
    const LEN: usize = DISCRIMINATOR_LENGTH + PUBKEY_LENGTH + TIMESTAMP_LENGTH + STRING_LENGTH_PREFIX + CONTENT_LENGTH;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Content has max length 320 characters.")]
    ContentIsLong,
}