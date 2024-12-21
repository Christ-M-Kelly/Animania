'use client';

import { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getToken, getUser } = useAuth();
  const pathname = usePathname();

  // Vérifier l'état de connexion à chaque rendu
  const token = getToken();
  const user = getUser();
  const isAuthenticated = !!token && !!user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour commenter');
      return;
    }

    if (!newComment.trim()) {
      toast.warning('Le commentaire ne peut pas être vide');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment.trim(),
          postId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du commentaire');
      }

      setComments([data.comment, ...comments]);
      setNewComment('');
      toast.success('Commentaire publié avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du commentaire:', error);
      toast.error('Une erreur est survenue lors de l\'envoi du commentaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Commentaires</h3>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors duration-200"
            placeholder="Votre commentaire..."
            rows={3}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publication...' : 'Publier'}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            <Link 
              href={`/connexion?returnUrl=${encodeURIComponent(pathname)}`}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Connectez-vous
            </Link>{' '}
            pour laisser un commentaire
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{comment.author.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </p>
        )}
      </div>
    </div>
  );
}