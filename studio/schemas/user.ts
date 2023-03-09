export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'publicKey',
      type: 'string',
      title: 'Public Key',
    },
    {
      name: 'profileImage',
      type: 'image',
      title: 'Profile Image',
      initialValue: null,
    },
    {
      name: 'following',
      type: 'array',
      title: 'Following',
      of: [{type: 'string'}],
      defaultValue: [],
    },
  ],
}
