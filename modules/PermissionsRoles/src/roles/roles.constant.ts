export const RolesNames = {
  superadmin: 'superadmin',
  systemadmin: 'systemadmin',
  moderator: 'moderator',
  user: 'user',
  banned: 'banned',
  anonymous: 'anonymous'
};

export const RolesActions = {
  superadmin: [RolesNames.superadmin],
  systemadmin: [RolesNames.superadmin, RolesNames.systemadmin],
  moderator: [RolesNames.superadmin, RolesNames.systemadmin, RolesNames.moderator],
  user: [RolesNames.superadmin, RolesNames.systemadmin, RolesNames.moderator, RolesNames.user],
  banned: [RolesNames.superadmin, RolesNames.systemadmin, RolesNames.moderator, RolesNames.user, RolesNames.banned],
  anonymous: [
    RolesNames.superadmin,
    RolesNames.systemadmin,
    RolesNames.moderator,
    RolesNames.user,
    RolesNames.banned,
    RolesNames.anonymous
  ]
};
