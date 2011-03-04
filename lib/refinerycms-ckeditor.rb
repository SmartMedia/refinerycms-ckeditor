require 'refinerycms-base'
require File.expand_path('../../app/helpers/ckeditor_helper', __FILE__)

module Refinery
  module Ckeditor
    
    class << self
      attr_accessor :root
      def root
        @root ||= Pathname.new(File.expand_path('../../', __FILE__))
      end
      
      def name
        self.to_s.split("::").last
      end
    end  
    
    class Engine < ::Rails::Engine
      
      initializer 'ckeditor serves assets' do |app|
        app.middleware.insert_after ::ActionDispatch::Static, ::ActionDispatch::Static, "#{root}/public"
      end
            
      config.after_initialize do
        ::Refinery::Plugin.register do |plugin|
          plugin.name = "refinery_ckeditor"
          plugin.version = %q{0.9.9}
          plugin.hide_from_menu = true
        end
      end
    end
  end

end

# Add engine
::Refinery.engines << "ckeditor"

# Load editor
Refinery.editor = Refinery::Ckeditor

# Include helper
::Refinery::ApplicationHelper.send :include, CkeditorHelper