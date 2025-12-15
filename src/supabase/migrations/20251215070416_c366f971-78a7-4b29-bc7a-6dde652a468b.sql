-- Drop the security definer view and replace with a regular function
DROP VIEW IF EXISTS public.recipe_ratings_view;

-- Create a regular function instead (not security definer)
CREATE OR REPLACE FUNCTION public.get_recipe_ratings(p_recipe_id UUID)
RETURNS TABLE (rating_count INTEGER, average_rating FLOAT)
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT 
    COUNT(*)::INTEGER as rating_count,
    COALESCE(ROUND(AVG(rating)::NUMERIC, 1)::FLOAT, 0) as average_rating
  FROM public.ratings
  WHERE recipe_id = p_recipe_id;
$$;
