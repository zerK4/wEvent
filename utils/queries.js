export const allUsersQuery = () => {
  const query = `*[_type == 'user' && !(_id in path('drafts.**'))] | order(_createdAt desc) {
            _id,
            userName,
            role,
            phone,
            email,
            darkMode,
            profileImage{
              asset->{
                _id,
                url
              }
            },
            wCode
        }`;
  return query;
};
export const wCode = (code) => {
  const query = `*[_type == 'wedding' && wCode == '${code}' && !(_id in path('drafts.**'))] {
            _id,
            wCode,
            wName,
            wCore,
            wImage{
              asset->{
                _id,
                url
              }
          },
            guests,
        }`;
  return query;
};
export const loginQuery = (email) => {
  const query = `*[_type == 'user' && email == '${email}'] {
    _id,
    userName,
    role,
    email,
    token,
    darkMode,
    phone,
    profileImage{
        asset->{
          _id,
          url
        }
    },
    wCode
  }`;
  return query;
};
export const userQuery = (id) => {
  const query = `*[_type == 'user' && _id == '${id}'] {
    _id,
    userName,
    role,
    email,
    token,
    darkMode,
    phone,
    profileImage{
        asset->{
          _id,
          url
        }
    },
    wCode
  }`;
  return query;
};
export const currentEventQuery = (eventId) => {
  const query = `*[_type == 'wedding' && _id == '${eventId}' && !(_id in path('drafts.**'))] | order(_createdAt desc) {
            _id,
            _createdAt,
            wCode,
            wCore,
            wName,
            wDate,
            image{
                asset->{
                  _id,
                  url
                }
            },
        }`;
  return query;
};
export const guestQuery = (wCode) => {
  const query = `*[_type == 'member' && wCode._ref == '${wCode}' ] {
            _id,
            mName,
            location,
            wCode,
            phone,
            confirmed,
            provided,
        }`;
  return query;
};
export const oneGuestQuery = (userId) => {
  const query = `*[_type == 'member' && _id == '${userId}' ] {
            _id,
            mName,
            location,
            wCode,
            phone,
            confirmed,
            provided,
        }`;
  return query;
};
export const allPostsQuery = (wCode) => {
  const query = `*[_type == 'post' && wCode._ref == '${wCode}' && !(_id in path('drafts.**'))] | order(_createdAt desc) {
            _id,
            content,
            created,
            postedBy,
            wCode,
            comment,
            topic,
            image{
              fileType,
              img{
                asset->{
                  _id,
                  url
                }
              }
            },
        }`;
  return query;
};
export const allContractsQuery = (wCode) => {
  const query = `*[_type == 'contract' && wCode._ref == '${wCode}' && !(_id in path('drafts.**'))] | order(_createdAt desc) {
            _id,
           wCode,
           service,
           supplier,
           cNumber,
           cPhone,
           cEmail,
           price,
           contractFile{
            asset->{
              _id,
              url
            }
           }
        }`;
  return query;
};
