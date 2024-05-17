import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $url: String!
    $name: String!
    $amiiboserie: String!
    $gameseries: String!
    $type: String!
  ) {
    createLink(url: $url, name: $name, amiiboserie: $amiiboserie, gameseries: $gameseries, type: $type) {
      id
      url
      name
      amiiboserie
      gameseries
      type
    }
  }
`;

const CreateLink = () => {
const navigate = useNavigate();

  const [formState, setFormState] = useState({
    url: '',
    name:'',
    amiiboserie:'',
    gameseries:'',
    type:''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: formState.url,
      name: formState.name,
      amiiboserie: formState.amiiboserie,
      gameseries: formState.gameseries,
      type: formState.type
    },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
          <input
            className="mb2"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Nombre"
          />
          <input
            className="mb2"
            value={formState.amiiboserie}
            onChange={(e) =>
              setFormState({
                ...formState,
                amiiboserie: e.target.value
              })
            }
            type="text"
            placeholder="Amiiboserie"
          />
          <input
            className="mb2"
            value={formState.gameseries}
            onChange={(e) =>
              setFormState({
                ...formState,
                gameseries: e.target.value
              })
            }
            type="text"
            placeholder="Gameseries"
          />
          <input
            className="mb2"
            value={formState.type}
            onChange={(e) =>
              setFormState({
                ...formState,
                type: e.target.value
              })
            }
            type="text"
            placeholder="Tipo"
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default CreateLink;