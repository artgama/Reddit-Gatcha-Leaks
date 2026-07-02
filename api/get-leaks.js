export default async function handler(request, response) {
    // Pegamos o subreddit que o React enviar, ou usamos o padrão de Genshin
    const { subreddit = 'HonkaiStarRail_leaks' } = request.query;
  
    try {
      // 1. Buscamos os dados direto do servidor da Vercel (onde o CORS NÃO EXISTE)
      const redditResponse = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, {
        headers: {
          // Simulamos o navegador a partir do servidor, o Reddit aceita sem problemas
          'User-Agent': 'Mozilla/5.0 (ServerlessBackend; LeaksClient/1.0)'
        }
      });
  
      if (!redditResponse.ok) {
        return response.status(redditResponse.status).json({ error: 'Erro ao conectar com o Reddit' });
      }
  
      const data = await redditResponse.json();
  
      // 2. Limpamos os dados aqui mesmo para enviar apenas o necessário para o React
      const cleanPosts = data.data.children.map(post => ({
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        url: post.data.url,
        score: post.data.score,
        numComments: post.data.num_comments
      }));
  
      // 3. Respondemos para o nosso app React
      return response.status(200).json(cleanPosts);
  
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }