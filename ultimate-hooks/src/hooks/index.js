import { useEffect, useState } from 'react';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getResources = async () => {
      const response = await fetch(baseUrl)
      const data = await response.json()
      setResources(data)
    }

    getResources()
  }, [baseUrl]);

  const create = (resource) => {
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resource)
    })
    setResources([...resources, resource])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
